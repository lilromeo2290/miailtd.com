'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  Newspaper,
  ArrowLeft,
  Calendar,
  User,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  X,
} from 'lucide-react'
import { useNavigation } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  image: string
}

const categories = ['All', 'Announcement', 'Industry News', 'Project Update', 'Tips']

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsSection() {
  const { currentPage } = useNavigation()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentPage !== 'news') return
    setLoading(true)
    const param = activeCategory === 'All' ? '' : activeCategory
    fetch(`/api/news?category=${param}`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.articles ?? (Array.isArray(data) ? data : [])
        setArticles(list)
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [currentPage, activeCategory])

  const filtered = articles.filter((a) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
  })

  const activeArticle = selectedArticle ? articles.find((a) => a.slug === selectedArticle) : null

  if (currentPage !== 'news') return null

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-safety-orange/20 text-safety-orange px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            Latest Updates
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            News & Insights
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Stay updated with our latest projects, company news, and industry insights
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-light-grey border-b border-concrete sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setSelectedArticle(null)
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-safety-orange text-white'
                      : 'bg-white text-steel-grey hover:bg-concrete hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-grey" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-steel-grey hover:text-navy" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Article Detail View */}
          {activeArticle ? (
            <article className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 text-sm font-medium text-steel-grey hover:text-navy mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </button>

              {/* Full Image */}
              <div className="rounded-xl overflow-hidden mb-8">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>

              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-safety-orange text-white hover:bg-safety-orange/90">
                  {activeArticle.category}
                </Badge>
                <span className="flex items-center gap-1.5 text-sm text-steel-grey">
                  <Calendar className="w-4 h-4" />
                  {formatDate(activeArticle.date)}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-steel-grey">
                  <User className="w-4 h-4" />
                  {activeArticle.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-6 leading-tight">
                {activeArticle.title}
              </h1>

              {/* Full Content */}
              <div className="prose prose-lg max-w-none text-navy/80 leading-relaxed whitespace-pre-line mb-10">
                {activeArticle.content}
              </div>

              {/* Share Buttons */}
              <div className="border-t border-concrete pt-6 flex items-center gap-3">
                <span className="text-sm font-medium text-steel-grey">Share:</span>
                <button
                  className="w-9 h-9 rounded-full bg-light-grey flex items-center justify-center hover:bg-navy hover:text-white text-steel-grey transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-light-grey flex items-center justify-center hover:bg-navy hover:text-white text-steel-grey transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-light-grey flex items-center justify-center hover:bg-navy hover:text-white text-steel-grey transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </article>
          ) : (
            <>
              {/* Article Grid */}
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full rounded-none" />
                      <CardContent className="p-5">
                        <Skeleton className="h-4 w-20 mb-3" />
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <div className="flex justify-between">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <Newspaper className="w-12 h-12 text-concrete mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-2">No articles found</h3>
                  <p className="text-steel-grey text-sm">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((article) => (
                    <Card
                      key={article.slug}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3 bg-safety-orange text-white hover:bg-safety-orange/90 text-xs">
                          {article.category}
                        </Badge>
                      </div>

                      <CardContent className="p-5 flex flex-col flex-1">
                        <h3 className="font-semibold text-navy mb-2 line-clamp-2 group-hover:text-safety-orange transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-steel-grey line-clamp-2 mb-4 flex-1">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-steel-grey mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {article.author}
                          </span>
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedArticle(article.slug)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="w-full border-navy/20 text-navy hover:bg-safety-orange hover:text-white hover:border-safety-orange text-sm"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}