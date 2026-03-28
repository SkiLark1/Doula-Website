import { useState, useEffect } from 'react'
import { MessageSquare, ChevronDown, ChevronUp, X, Save, Loader2 } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import AdminLayout from '../components/AdminLayout'

const serviceLabels = {
  birth: 'Birth Doula Support',
  postpartum: 'Postpartum Doula Care',
  both: 'Both Services',
  unsure: 'Not sure yet',
}

const statusColors = {
  new: 'bg-sage/10 text-sage-dark border-sage/20',
  contacted: 'bg-warm/10 text-warm-dark border-warm/20',
  booked: 'bg-green-50 text-green-700 border-green-200',
  archived: 'bg-gray-100 text-gray-500 border-gray-200',
}

export default function QuotesPage() {
  const { apiFetch } = useApi()
  const [quotes, setQuotes] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchQuotes = async () => {
    setLoading(true)
    try {
      const data = await apiFetch(`/api/quotes?status=${filter}&limit=50`)
      setQuotes(data.quotes)
      setTotal(data.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [filter])

  const updateStatus = async (id, status) => {
    try {
      const updated = await apiFetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)))
    } catch (err) {
      console.error(err)
    }
  }

  const saveNotes = async (id) => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ notes: editNotes }),
      })
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)))
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const toggleExpand = (quote) => {
    if (expandedId === quote.id) {
      setExpandedId(null)
    } else {
      setExpandedId(quote.id)
      setEditNotes(quote.notes || '')
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Quotes</h1>
          <p className="text-sm text-gray-500 mt-1">{total} total submissions</p>
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1 flex-wrap">
          {['all', 'new', 'contacted', 'booked', 'archived'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                filter === s
                  ? 'bg-sage text-white'
                  : 'text-gray-500 hover:text-charcoal'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-sage border-t-transparent rounded-full" />
        </div>
      ) : quotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <MessageSquare size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No quotes found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Row header */}
              <button
                onClick={() => toggleExpand(quote)}
                className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-medium text-charcoal">{quote.name}</p>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusColors[quote.status]}`}>
                      {quote.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {serviceLabels[quote.service] || quote.service} &middot;{' '}
                    {new Date(quote.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {expandedId === quote.id ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </button>

              {/* Expanded detail */}
              {expandedId === quote.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Email</p>
                      <a href={`mailto:${quote.email}`} className="text-sm text-sage-dark hover:underline">
                        {quote.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Phone</p>
                      <p className="text-sm text-charcoal">{quote.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Due Date</p>
                      <p className="text-sm text-charcoal">{quote.due_date}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Service</p>
                      <p className="text-sm text-charcoal">{serviceLabels[quote.service] || quote.service}</p>
                    </div>
                  </div>

                  {quote.message && (
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Message</p>
                      <p className="text-sm text-charcoal bg-gray-50 rounded-xl p-4 leading-relaxed">
                        {quote.message}
                      </p>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Private Notes</p>
                    <div className="flex gap-2">
                      <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 text-sm text-charcoal resize-none"
                        placeholder="Add notes about this inquiry..."
                      />
                      <button
                        onClick={() => saveNotes(quote.id)}
                        disabled={saving}
                        className="px-4 py-2 bg-sage text-white rounded-xl text-sm hover:bg-sage-dark transition-colors disabled:opacity-50 flex items-center gap-1"
                      >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Status actions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <p className="text-xs uppercase tracking-wider text-gray-400 w-full mb-1">Update Status</p>
                    {['new', 'contacted', 'booked', 'archived'].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(quote.id, s)}
                        disabled={quote.status === s}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-colors ${
                          quote.status === s
                            ? statusColors[s]
                            : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-charcoal'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
