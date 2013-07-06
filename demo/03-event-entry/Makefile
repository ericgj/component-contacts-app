SRC =  $(wildcard ../../client/*/*.js)
HTML = $(wildcard ../../client/*/*.html)
DATA = $(wildcard ../../client/dummy*/*.data.json)
CONVERT = $(HTML:.html=.js)
DATAJS = $(DATA:.data.json=.js)

build: components $(SRC) $(CONVERT) $(DATAJS)
	@component build --dev 

components: component.json
	@component install --dev

%.js: %.html
	@component convert $<

%.js: %.data.json
	@echo "module.exports = " > $@ 
	@cat "$<"  >> $@
	@echo ";" >> $@

clean:
	rm -fr build components $(CONVERT) $(DATAJS)

.PHONY: clean
