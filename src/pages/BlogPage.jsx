import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogCategories, getAllPosts, getFeaturedPosts } from '../data/blogPosts'
import './BlogPage.css'

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts()
  const allPosts = getAllPosts()
  const latestPost = allPosts[0]
  const recentPosts = allPosts.slice(1)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <>
      <Helmet>
        <title>Blog - TradeFlows Pro Insights & Trading Strategies</title>
        <meta name="description" content="Expert trading strategies, market analysis, and platform updates from the TradeFlows Pro team. Learn from professional traders and stay ahead of market trends." />
      </Helmet>

      <div className="blog-page">
        {/* Hero */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-content">
              <h1>TradeFlows <span className="gradient-text">Insights</span></h1>
              <p>
                Expert trading strategies, market analysis, and platform updates from our team of professional traders and engineers.
              </p>

              {/* Categories */}
              <div className="blog-categories">
                <Link to="/blog" className="category-pill active">
                  All Posts
                </Link>
                {blogCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/blog?category=${category.id}`}
                    className="category-pill"
                    style={{ '--category-color': category.color }}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {latestPost && (
          <section className="featured-post section">
            <div className="container">
              <div className="featured-label">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1l2.5 6.5L19 8.5l-5.5 4.5L15 20l-5-3.5L5 20l1.5-7L1 8.5l6.5-1L10 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Latest Post
              </div>

              <Link to={`/blog/${latestPost.slug}`} className="featured-card">
                <div className="featured-image">
                  <div className="image-placeholder">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect width="80" height="80" rx="8" fill="url(#featuredGrad)"/>
                      <defs>
                        <linearGradient id="featuredGrad">
                          <stop stopColor="#3b9eff"/>
                          <stop offset="1" stopColor="#a78bfa"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="featured-content">
                  <div className="post-meta">
                    <span className="post-category" style={{ '--category-color': blogCategories.find(c => c.id === latestPost.category)?.color }}>
                      {blogCategories.find(c => c.id === latestPost.category)?.name}
                    </span>
                    <span className="post-date">{formatDate(latestPost.publishDate)}</span>
                    <span className="post-read-time">{latestPost.readTime}</span>
                  </div>

                  <h2 className="featured-title">{latestPost.title}</h2>
                  <p className="featured-excerpt">{latestPost.excerpt}</p>

                  <div className="post-author">
                    <div className="author-avatar">{latestPost.author.avatar}</div>
                    <div className="author-info">
                      <div className="author-name">{latestPost.author.name}</div>
                      <div className="author-role">{latestPost.author.role}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="recent-posts section">
          <div className="container">
            <div className="section-header">
              <h2>Recent Articles</h2>
            </div>

            <div className="posts-grid">
              {recentPosts.map((post) => {
                const category = blogCategories.find(c => c.id === post.category)

                return (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="post-card"
                  >
                    <div className="post-image">
                      <div className="image-placeholder small">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                          <rect width="60" height="60" rx="6" fill="url(#postGrad)"/>
                          <defs>
                            <linearGradient id="postGrad">
                              <stop stopColor="#3b9eff"/>
                              <stop offset="1" stopColor="#10b981"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-category" style={{ '--category-color': category?.color }}>
                          {category?.name}
                        </span>
                        <span className="post-date">{formatDate(post.publishDate)}</span>
                      </div>

                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.excerpt}</p>

                      <div className="post-footer">
                        <div className="post-author-small">
                          <div className="author-avatar-small">{post.author.avatar}</div>
                          <span className="author-name-small">{post.author.name}</span>
                        </div>
                        <span className="post-read-time">{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="newsletter-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Stay Updated</h2>
              <p>Get the latest trading insights, market analysis, and platform updates delivered to your inbox.</p>

              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>

              <p className="newsletter-note">
                Join 50,000+ traders receiving our weekly newsletter. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
