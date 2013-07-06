require 'json'
require 'logger'

require 'cuba'
# require 'rack/protection'

Cuba.use Rack::Static, 
  :root => '../demo', 
  :urls => ['/01-skeleton', '/02-sidebar', '/03-event-entry'],
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

  def page_params(p=0,n=20)
    page =  begin; Integer(req.params["page"]);  rescue TypeError; p; end
    limit = begin; Integer(req.params["limit"]); rescue TypeError; n; end
    [page,limit]
  end

end

Cuba::Response.__send__(:include, ResponseHelpers)
Cuba.plugin(AppHelpers)

require_relative "models/contact"
require_relative "models/list"

Cuba.define do
  
  on 'contact' do

    # TODO sort
    on get, 'all' do
      page, limit = page_params(0,20)
      contacts = Contact.all
      total    = contacts.length
      contacts = contacts[page*limit, limit]

      on xhr? do
        res.json!
        res.write r = JSON.dump({total: total, contacts: contacts})
        logger.debug "GET /contact/all => " + r
      end

    end

  end

  on 'contact-list' do

    on get, 'all' do
      lists = List.all

      on xhr? do
        res.json!
        res.write r =  JSON.dump(lists)
        logger.debug "GET /list/all => " + r
      end
    end

    on get, ':id/contact/all' do |id|
      page, limit = page_params(0,20)
      contacts = List[Integer(id)].contacts
      total    = contacts.length
      contacts = contacts[page*limit, limit]
      
  #   on xhr? do
        res.json!
        res.write r = JSON.dump({total: total, contacts: contacts})
        logger.debug "GET /list/#{id}/contact/all => " + r
  #   end
    end

  end

end

