require File.expand_path('app', Dir.pwd)

if fix = ENV['FIXTURES']
  fix.split(',').each do |f| DummyContact.loadFixture f; end
end

run Cuba

