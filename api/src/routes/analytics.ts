import { Hono } from 'hono'
import type { Env } from '../index'
import { authMiddleware } from '../middleware/auth'

export const analyticsRoutes = new Hono<{ Bindings: Env }>()

// Public — track page view
analyticsRoutes.post('/track', async (c) => {
  const { path, referrer, visitorId } = await c.req.json<{
    path: string
    referrer?: string
    visitorId?: string
  }>()

  if (!path) {
    return c.json({ error: 'Path required' }, 400)
  }

  const ua = c.req.header('User-Agent') || ''

  await c.env.DB.prepare(
    'INSERT INTO page_views (path, referrer, visitor_id, user_agent) VALUES (?, ?, ?, ?)'
  )
    .bind(path, referrer || null, visitorId || null, ua)
    .run()

  return c.json({ ok: true })
})

// Protected — get analytics dashboard data
analyticsRoutes.get('/analytics', authMiddleware, async (c) => {
  const period = c.req.query('period') || '30d'
  const days = period === '7d' ? 7 : period === '90d' ? 90 : 30
  const since = new Date(Date.now() - days * 86400000).toISOString()

  const [pageViews, uniqueVisitors, submissions, topPages, viewsOverTime] = await Promise.all([
    // Total page views
    c.env.DB.prepare('SELECT COUNT(*) as count FROM page_views WHERE created_at >= ?')
      .bind(since)
      .first(),

    // Unique visitors
    c.env.DB.prepare('SELECT COUNT(DISTINCT visitor_id) as count FROM page_views WHERE created_at >= ? AND visitor_id IS NOT NULL')
      .bind(since)
      .first(),

    // Form submissions
    c.env.DB.prepare('SELECT COUNT(*) as count FROM quotes WHERE created_at >= ?')
      .bind(since)
      .first(),

    // Top pages
    c.env.DB.prepare('SELECT path, COUNT(*) as views FROM page_views WHERE created_at >= ? GROUP BY path ORDER BY views DESC LIMIT 10')
      .bind(since)
      .all(),

    // Views over time (daily)
    c.env.DB.prepare("SELECT DATE(created_at) as date, COUNT(*) as views FROM page_views WHERE created_at >= ? GROUP BY DATE(created_at) ORDER BY date")
      .bind(since)
      .all(),
  ])

  const totalViews = (pageViews?.count as number) || 0
  const totalUnique = (uniqueVisitors?.count as number) || 0
  const totalSubmissions = (submissions?.count as number) || 0
  const conversionRate = totalUnique > 0 ? ((totalSubmissions / totalUnique) * 100).toFixed(1) : '0'

  // Recent submissions
  const recentQuotes = await c.env.DB.prepare(
    'SELECT id, name, service, status, created_at FROM quotes ORDER BY created_at DESC LIMIT 5'
  ).all()

  // Status breakdown
  const statusBreakdown = await c.env.DB.prepare(
    'SELECT status, COUNT(*) as count FROM quotes GROUP BY status'
  ).all()

  return c.json({
    period: `${days}d`,
    pageViews: totalViews,
    uniqueVisitors: totalUnique,
    formSubmissions: totalSubmissions,
    conversionRate: parseFloat(conversionRate),
    topPages: topPages.results,
    viewsOverTime: viewsOverTime.results,
    recentQuotes: recentQuotes.results,
    statusBreakdown: statusBreakdown.results,
  })
})
