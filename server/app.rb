require 'json'
require 'logger'

require 'cuba'
# require 'rack/protection'

Cuba.use Rack::Static, 
  :root => '../demo', 
  :urls => ['/01-skeleton'],
  :index => 'index.html'

Cuba.use Rack::Logger, ::Logger::DEBUG

# Cuba.use Rack::Protection

module ResponseHelpers
  def json!
    self['Content-Type'] = 'application/json'
  end

end

module AppHelpers
  def xhr?
    lambda { req.xhr? }
  end
  def logger
    env['rack.logger']
  end
end

Cuba::Response.__send__(:include, ResponseHelpers)
Cuba.plugin(AppHelpers)

require_relative "models/contact"

Cuba.define do
  
  on 'contact' do

    # TODO sort
    on get, 'all' do
      limit = begin; Integer(req.params["n"]); rescue TypeError; 20; end
      page = begin; Integer(req.params["p"]);  rescue TypeError; 0; end
      contacts = Contact.page(page,limit)

      on xhr? do
        res.json!
        res.write r = JSON.dump(contacts)
        logger.debug "GET /contact/all => " + r
      end

    end

    on get, 'count' do
      count = Contact.count
      on xhr? do
        res.json!
        res.write r = count.to_json
        logger.debug "GET /contact/count => " + r
      end
    end

  end

end

