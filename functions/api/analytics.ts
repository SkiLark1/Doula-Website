import { requireAuth } from '../lib/auth'

interface Env {
  DB: D1Database
  JWT_SECRET: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    await requireAuth(context.request, context.env.JWT_SECRET)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(context.request.url)
  const period = url.searchParams.get('period') || '30d'
  const days = period === '7d' ? 7 : period === '90d' ? 90 : 30
  const since = new Date(Date.now() - days * 86400000).toISOString()

  const [pageViews, uniqueVisitors, submissions, topPages, viewsOverTime] = await Promise.all([
    context.env.DB.prepare('SELECT COUNT(*) as count FROM page_views WHERE created_at >= ?').bind(since).first(),
    context.env.DB.prepare('SELECT COUNT(DISTINCT visitor_id) as count FROM page_views WHERE created_at >= ? AND visitor_id IS NOT NULL').bind(since).first(),
    context.env.DB.prepare('SELECT COUNT(*) as count FROM quotes WHERE created_at >= ?').bind(since).first(),
    context.env.DB.prepare('SELECT path, COUNT(*) as views FROM page_views WHERE created_at >= ? GROUP BY path ORDER BY views DESC LIMIT 10').bind(since).all(),
    context.env.DB.prepare("SELECT DATE(created_at) as date, COUNT(*) as views FROM page_views WHERE created_at >= ? GROUP BY DATE(created_at) ORDER BY date").bind(since).all(),
  ])

  const totalViews = (pageViews?.count as number) || 0
  const totalUnique = (uniqueVisitors?.count as number) || 0
  const totalSubmissions = (submissions?.count as number) || 0
  const conversionRate = totalUnique > 0 ? ((totalSubmissions / totalUnique) * 100).toFixed(1) : '0'

  const recentQuotes = await context.env.DB.prepare(
    'SELECT id, name, service, status, created_at FROM quotes ORDER BY created_at DESC LIMIT 5'
  ).all()

  const statusBreakdown = await context.env.DB.prepare(
    'SELECT status, COUNT(*) as count FROM quotes GROUP BY status'
  ).all()

  return Response.json({
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
}
