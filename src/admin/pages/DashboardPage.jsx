import { useState, useEffect } from 'react'
import { Eye, Users, FileText, TrendingUp, Globe, Clock } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import MetricCard from '../components/MetricCard'
import AdminLayout from '../components/AdminLayout'

export default function DashboardPage() {
  const { apiFetch } = useApi()
  const [data, setData] = useState(null)
  const [period, setPeriod] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiFetch(`/api/analytics?period=${period}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [period])

  const serviceLabels = {
    birth: 'Birth Doula',
    postpartum: 'Postpartum',
    both: 'Both Services',
    unsure: 'Not sure yet',
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your website activity</p>
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1">
          {['7d', '30d', '90d'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-sage text-white'
                  : 'text-gray-500 hover:text-charcoal'
              }`}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-sage border-t-transparent rounded-full" />
        </div>
      ) : data ? (
        <div className="space-y-8">
          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Page Views"
              value={data.pageViews.toLocaleString()}
              icon={Eye}
              color="sage"
              tooltip="Total number of pages viewed across all visitors during this time period. Each page load counts as one view."
            />
            <MetricCard
              title="Unique Visitors"
              value={data.uniqueVisitors.toLocaleString()}
              icon={Users}
              color="warm"
              tooltip="Distinct visitors identified by a privacy-friendly browser fingerprint. No cookies are used. The same person visiting from different devices counts as separate visitors."
            />
            <MetricCard
              title="Form Submissions"
              value={data.formSubmissions.toLocaleString()}
              icon={FileText}
              color="blush"
              tooltip="Total contact form submissions received during this period. Each submission represents a potential client reaching out for your services."
            />
            <MetricCard
              title="Conversion Rate"
              value={`${data.conversionRate}%`}
              icon={TrendingUp}
              color="charcoal"
              tooltip="The percentage of unique visitors who submitted the contact form. Higher rates mean your website is effectively converting visitors into leads. Industry average for service websites is 2-5%."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Popular pages */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} className="text-sage" />
                <h2 className="font-semibold text-charcoal">Popular Pages</h2>
                <div className="relative group ml-auto">
                  <span className="text-gray-300 hover:text-gray-500 cursor-help">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  </span>
                  <div className="absolute right-0 top-6 w-52 bg-charcoal text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 hidden group-hover:block leading-relaxed">
                    Shows which pages on your site get the most traffic. Use this to understand what visitors are most interested in.
                  </div>
                </div>
              </div>
              {data.topPages?.length > 0 ? (
                <div className="space-y-3">
                  {data.topPages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-charcoal truncate flex-1 mr-4">
                        {page.path === '/' ? 'Home' : page.path.replace(/^\//, '').replace(/-/g, ' ')}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sage rounded-full"
                            style={{
                              width: `${(page.views / data.topPages[0].views) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-12 text-right">
                          {page.views}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No page view data yet</p>
              )}
            </div>

            {/* Recent submissions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-warm" />
                <h2 className="font-semibold text-charcoal">Recent Submissions</h2>
                <div className="relative group ml-auto">
                  <span className="text-gray-300 hover:text-gray-500 cursor-help">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  </span>
                  <div className="absolute right-0 top-6 w-52 bg-charcoal text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 hidden group-hover:block leading-relaxed">
                    The most recent contact form submissions. Click on a name to view full details in the Quotes page.
                  </div>
                </div>
              </div>
              {data.recentQuotes?.length > 0 ? (
                <div className="space-y-3">
                  {data.recentQuotes.map((quote) => {
                    const statusColors = {
                      new: 'bg-sage/10 text-sage-dark',
                      contacted: 'bg-warm/10 text-warm-dark',
                      booked: 'bg-green-100 text-green-700',
                      archived: 'bg-gray-100 text-gray-500',
                    }
                    return (
                      <div key={quote.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-charcoal">{quote.name}</p>
                          <p className="text-xs text-gray-400">
                            {serviceLabels[quote.service] || quote.service}
                          </p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[quote.status]}`}>
                          {quote.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No submissions yet</p>
              )}
            </div>
          </div>

          {/* Status breakdown */}
          {data.statusBreakdown?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-sage" />
                <h2 className="font-semibold text-charcoal">Quote Status Overview</h2>
                <div className="relative group ml-auto">
                  <span className="text-gray-300 hover:text-gray-500 cursor-help">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  </span>
                  <div className="absolute right-0 top-6 w-52 bg-charcoal text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 hidden group-hover:block leading-relaxed">
                    Breakdown of all your quote submissions by their current status. Helps you track your pipeline at a glance.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['new', 'contacted', 'booked', 'archived'].map((status) => {
                  const found = data.statusBreakdown.find((s) => s.status === status)
                  const count = found?.count || 0
                  const colors = {
                    new: 'border-sage/30 bg-sage/5',
                    contacted: 'border-warm/30 bg-warm/5',
                    booked: 'border-green-200 bg-green-50',
                    archived: 'border-gray-200 bg-gray-50',
                  }
                  return (
                    <div key={status} className={`rounded-xl border p-4 text-center ${colors[status]}`}>
                      <p className="text-2xl font-semibold text-charcoal">{count}</p>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mt-1 capitalize">{status}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">Failed to load dashboard data</p>
      )}
    </AdminLayout>
  )
}
