
class DummyContact

  def to_h
    { name: name,
      email: email,
      phone: phone
    }
  end

  def to_json(*a); to_h.to_json(*a); end

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
      data = Array(
              JSON.load( File.open( fixture(name) ) )
             )
      data.each do |rec| _data << new(rec); end
    end

    def clear
      @_data = []  
    end

    def fixture(name)
      File.expand_path('../test/fixtures/contact',File.dirname(__FILE__))
    end

  end

end

Contact = DummyContact
