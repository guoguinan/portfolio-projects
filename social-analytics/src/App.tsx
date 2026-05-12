import { useState } from 'react'
import { TrendingUp, Users, MessageCircle, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const metrics = [
  { label: 'Total Followers', value: '124.5K', change: '+12.3%', up: true, icon: Users },
  { label: 'Engagement Rate', value: '4.8%', change: '+0.6%', up: true, icon: MessageCircle },
  { label: 'Total Reach', value: '892.1K', change: '+23.1%', up: true, icon: Eye },
  { label: 'Growth Rate', value: '8.2%', change: '-1.2%', up: false, icon: TrendingUp },
]

const engagementData = [
  { name: 'Mon', likes: 4200, comments: 1800, shares: 900 },
  { name: 'Tue', likes: 5100, comments: 2200, shares: 1100 },
  { name: 'Wed', likes: 4800, comments: 1950, shares: 980 },
  { name: 'Thu', likes: 6200, comments: 2800, shares: 1400 },
  { name: 'Fri', likes: 5800, comments: 2500, shares: 1250 },
  { name: 'Sat', likes: 7100, comments: 3200, shares: 1800 },
  { name: 'Sun', likes: 6500, comments: 2900, shares: 1600 },
]

const followerGrowth = [
  { name: 'Week 1', followers: 98000 },
  { name: 'Week 2', followers: 102000 },
  { name: 'Week 3', followers: 108000 },
  { name: 'Week 4', followers: 115000 },
  { name: 'Week 5', followers: 118000 },
  { name: 'Week 6', followers: 124500 },
]

const platformData = [
  { name: 'Instagram', value: 45, color: '#6366f1' },
  { name: 'Twitter', value: 25, color: '#8b5cf6' },
  { name: 'LinkedIn', value: 20, color: '#ec4899' },
  { name: 'TikTok', value: 10, color: '#f43f5e' },
]

const topPosts = [
  { title: 'How to scale your startup in 2024', platform: 'LinkedIn', engagement: '12.4K', reach: '89.2K' },
  { title: '10 AI tools every developer needs', platform: 'Twitter', engagement: '8.7K', reach: '67.5K' },
  { title: 'Behind the scenes: Our new feature', platform: 'Instagram', engagement: '15.2K', reach: '102.1K' },
  { title: 'Day in the life of a tech lead', platform: 'TikTok', engagement: '22.1K', reach: '156.3K' },
]

function App() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text mb-1">Social Analytics</h1>
            <p className="text-text-muted">Track your social media performance across all platforms</p>
          </div>
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-muted hover:bg-surface-light'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-surface rounded-xl p-6 border border-surface-light/30">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="w-5 h-5 text-primary" />
                <span className={`flex items-center gap-1 text-sm font-medium ${metric.up ? 'text-success' : 'text-danger'}`}>
                  {metric.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-text mb-1">{metric.value}</div>
              <div className="text-sm text-text-muted">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Engagement Chart */}
          <div className="lg:col-span-2 bg-surface rounded-xl p-6 border border-surface-light/30">
            <h3 className="text-lg font-semibold text-text mb-4">Engagement Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="likes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="comments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="likes" stroke="#6366f1" fillOpacity={1} fill="url(#likes)" />
                <Area type="monotone" dataKey="comments" stroke="#8b5cf6" fillOpacity={1} fill="url(#comments)" />
                <Area type="monotone" dataKey="shares" stroke="#ec4899" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution */}
          <div className="bg-surface rounded-xl p-6 border border-surface-light/30">
            <h3 className="text-lg font-semibold text-text mb-4">Platform Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {platformData.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                    <span className="text-sm text-text-muted">{platform.name}</span>
                  </div>
                  <span className="text-sm font-medium text-text">{platform.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Follower Growth */}
          <div className="bg-surface rounded-xl p-6 border border-surface-light/30">
            <h3 className="text-lg font-semibold text-text mb-4">Follower Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={followerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Line type="monotone" dataKey="followers" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Posts */}
          <div className="bg-surface rounded-xl p-6 border border-surface-light/30">
            <h3 className="text-lg font-semibold text-text mb-4">Top Performing Posts</h3>
            <div className="space-y-3">
              {topPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface-light/30 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{post.title}</p>
                    <p className="text-xs text-text-muted">{post.platform}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium text-text">{post.engagement}</p>
                    <p className="text-xs text-text-muted">{post.reach} reach</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
