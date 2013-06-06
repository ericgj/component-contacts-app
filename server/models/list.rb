
class DummyList

  def to_h
    { id: attributes[:id],
      name: attributes[:name],
      dateUpdated: attributes[:dateUpdated]
    }
  end

  def to_json(*a); to_h.to_json(*a); end

  attr_reader :attributes, :contacts

  def initialize(hash)
    @attributes = {}
    @contacts = []
    (hash.delete('contacts') || []).each {|rec| self.add_contact(rec) }
    hash.each do |(k,v)|
      self.attributes[k.to_sym] = v
    end
  end
     
  def add_contact(hash)
    self.contacts << Contact.new(hash)
  end

  class << self

    def _data
      @_data ||= []
    end

    def all
      _data.dup
    end

    def [](id)
      _data.find {|rec| rec.attributes[:id] == id}
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
      File.expand_path(File.join('../test/fixtures/list', name + ".json"),
                       File.dirname(__FILE__))
    end

  end

end

List = DummyList
