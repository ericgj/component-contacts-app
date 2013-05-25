require 'json'

require 'cuba'
# require 'rack/protection'

Cuba.use Rack::Static, 
  :root => '../demo', 
  :urls => ['/01-skeleton'],
  :index => 'index.html'

# Cuba.use Rack::Protection

module ResponseHelpers
  def json!
    self['Content-Type'] = 'application/json'
  end
end

Cuba::Response.__send__(:include, ResponseHelpers)

require_relative "models/contact"

Cuba.define do
  
  on 'contact' do

    # TODO sort
    on get, 'all', param("p") do |page|
      limit = Integer(param("n")) rescue 20
      page = Integer(page) rescue 0
      contacts = Contact.page(page,limit)

      on accept('application/json') do
        res.json!
        res.write JSON.dump(contacts)
      end

    end

    on get, 'count' do
      count = Contact.count
      on accept('application/json') do
        res.json!
        res.write JSON.dump(count)
      end
    end

  end

end

