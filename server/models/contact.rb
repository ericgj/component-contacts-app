
class DummyContact

  def to_h
    { id: attributes['id'],
      first: attributes['first'],
      last: attributes['last'],
      email: attributes['email'],
      phone: attributes['phone']
    }
  end

  def to_json(*a); to_h.to_json(*a); end

  attr_reader :attributes

  def initialize(hash)
    @attributes = {}
    hash.each do |(k,v)|
      self.attributes[k] = v
    end
  end
      
  class << self

    def _data
      @_data ||= []
    end

    def page(page,limit)
      _data.slice(page * limit, limit)
    end

    def count
      _data.count
    end

    def loadFixture(name,save=false)
      clear unless save
      data = JSON.load( File.open( fixture(name) ) )
      data = Array === data ? data : [data]
      data.each do |rec| _data << new(rec); end
    end

    def clear
      @_data = []  
    end

    def fixture(name)
      File.expand_path(File.join('../test/fixtures/contact', name + ".json"),
                       File.dirname(__FILE__))
    end

  end

end

Contact = DummyContact
