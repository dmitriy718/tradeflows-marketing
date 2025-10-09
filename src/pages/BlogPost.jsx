import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPostBySlug, getCategoryById, getAllPosts } from '../data/blogPosts'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="post-not-found">
            <h1>Post Not Found</h1>
            <p>Sorry, we couldn't find the blog post you're looking for.</p>
            <Link to="/blog" className="btn btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const category = getCategoryById(post.category)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Simple markdown-to-JSX rendering
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index}>{line.substring(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index}>{line.substring(4)}</h3>
      }

      // Bold text
      const hasBold = /\*\*(.*?)\*\*/g.test(line)
      if (hasBold) {
        const parts = []
        let lastIndex = 0
        const boldRegex = /\*\*(.*?)\*\*/g
        let match

        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index))
          }
          parts.push(<strong key={`bold-${index}-${match.index}`}>{match[1]}</strong>)
          lastIndex = match.index + match[0].length
        }

        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex))
        }

        return <p key={index}>{parts}</p>
      }

      // Lists
      if (line.startsWith('- ')) {
        return <li key={index}>{line.substring(2)}</li>
      }

      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />
      }

      // Horizontal rules
      if (line.startsWith('---')) {
        return <hr key={index} />
      }

      // Regular paragraphs
      return <p key={index}>{line}</p>
    })
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - TradeFlows Pro Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="blog-post-page">
        {/* Breadcrumbs */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="breadcrumb-nav">
              <Link to="/blog">Blog</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link to={`/blog?category=${category.id}`}>{category?.name}</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{post.title}</span>
            </div>
          </div>
        </section>

        {/* Post Header */}
        <section className="post-header">
          <div className="container-post">
            <div className="post-category-badge" style={{ '--category-color': category?.color }}>
              {category?.name}
            </div>

            <h1 className="post-heading">{post.title}</h1>
            <p className="post-lead">{post.excerpt}</p>

            <div className="post-info">
              <div className="post-author-info">
                <div className="author-avatar-large">{post.author.avatar}</div>
                <div>
                  <div className="author-name-large">{post.author.name}</div>
                  <div className="author-role-large">{post.author.role}</div>
                </div>
              </div>

              <div className="post-details">
                <span className="detail-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 1v4M5 1v4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {formatDate(post.publishDate)}
                </span>
                <span className="detail-divider">•</span>
                <span className="detail-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {post.readTime}
                </span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Post Content */}
        <section className="post-content-section">
          <div className="container-post">
            <article className="post-body">
              <div className="prose">
                {renderContent(post.content)}
              </div>

              {/* Share & Actions */}
              <div className="post-actions">
                <h4>Share this article</h4>
                <div className="action-buttons">
                  <button className="action-btn twitter">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 19 3z" fill="currentColor"/>
                    </svg>
                    Twitter
                  </button>
                  <button className="action-btn linkedin">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" fill="currentColor"/>
                      <circle cx="4" cy="4" r="2" fill="currentColor"/>
                    </svg>
                    LinkedIn
                  </button>
                  <button className="action-btn copy">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="7" y="7" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 13H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="related-posts section">
            <div className="container">
              <h2>Related Articles</h2>
              <div className="related-grid">
                {relatedPosts.map((related) => {
                  const relatedCategory = getCategoryById(related.category)

                  return (
                    <Link
                      key={related.id}
                      to={`/blog/${related.slug}`}
                      className="related-card"
                    >
                      <div className="related-category" style={{ '--category-color': relatedCategory?.color }}>
                        {relatedCategory?.name}
                      </div>
                      <h3>{related.title}</h3>
                      <p>{related.excerpt}</p>
                      <div className="related-meta">
                        <span className="related-date">{formatDate(related.publishDate)}</span>
                        <span className="related-read-time">{related.readTime}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="post-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Trade Smarter?</h2>
              <p>Join thousands of traders using TradeFlows Pro for AI-powered insights and professional-grade tools.</p>
              <div className="cta-actions">
                <a href="https://app.tradeflows.net?signup=true" className="btn btn-large btn-primary">
                  Start Free Trial
                </a>
                <Link to="/blog" className="btn btn-large btn-secondary">
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
