import React, { FC } from 'react'

type P = {}
const About: FC<P> = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">About PrintCraft</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8"></div>
          </div>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-slate-200 font-light">
            Your trusted partner for premium custom printing services. We deliver high-quality products 
            with exceptional customer service and fast turnaround times.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our Story</h2>
            <div className="w-20 h-1 bg-slate-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-8 border-l-4 border-slate-600">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Founded in 2020</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  PrintCraft began as a small printing shop with a big vision: to revolutionize 
                  the custom printing industry through innovation, quality, and customer-centric service.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-slate-400">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Today</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We've grown into a leading printing company serving thousands of satisfied customers 
                  worldwide, from small businesses to large corporations. Our commitment to excellence and 
                  cutting-edge technology has made us the go-to choice for all printing needs.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-12 h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-slate-800/10"></div>
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">PrintCraft</h3>
                  <p className="text-lg text-slate-600 font-medium">Premium Printing Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our Core Values</h2>
            <div className="w-20 h-1 bg-slate-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do and shape our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-slate-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                  <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Quality Excellence</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We never compromise on quality. Every product undergoes rigorous quality checks 
                to ensure it meets our high standards.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-slate-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                  <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Customer First</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our customers are at the heart of everything we do. We listen, understand, 
                and deliver solutions that exceed expectations.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-slate-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                  <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Fast Delivery</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Time is precious. We understand urgency and deliver projects on time, 
                every time, without compromising quality.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-slate-200">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                  <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Reliability</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                You can count on us. We're dependable partners who deliver consistent 
                results and maintain long-term relationships.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-slate-700 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-800/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Impact</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-lg text-slate-200 font-medium">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-lg text-slate-200 font-medium">Projects Completed</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">4+</div>
              <div className="text-lg text-slate-200 font-medium">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-lg text-slate-200 font-medium">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-3xl p-12 border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Ready to Start Your Next Project?
            </h2>
            <div className="w-20 h-1 bg-slate-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust PrintCraft for their printing needs. 
              Let's bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/AllProducts" 
                className="group bg-slate-600 hover:bg-slate-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center">
                  Browse Products
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a 
                href="/Contact" 
                className="group bg-white hover:bg-gray-50 text-slate-600 border-2 border-slate-600 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center">
                  Get In Touch
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About;