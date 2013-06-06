require File.expand_path('app', Dir.pwd)

if fix = ENV['FIXTURES']
  fix.split(',').each do |f| 
    model, file = f.split('/') 
    file ||= model
    case model
    when 'contact'
      DummyContact.loadFixture file
    when 'list'
      DummyList.loadFixture file
    else
      DummyContact.loadFixture file
    end
  end
end

run Cuba

