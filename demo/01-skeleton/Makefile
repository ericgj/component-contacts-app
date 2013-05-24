SRC =  $(wildcard ../../client/*/*.js)
HTML = $(wildcard ../../client/*/*.html)
STACHE = $(wildcard ../../client/*/*.stache)
DATA = $(wildcard ../../client/dummy*/*.data.json)
CONVERT = $(HTML:.html=.js)
TEMPLATES = $(STACHE:.stache=.js)
DATAJS = $(DATA:.data.json=.js)

build: components $(SRC) $(CONVERT) $(TEMPLATES) $(DATAJS)
	@component build --dev

components: component.json
	@component install --dev

%.js: %.html
	@component convert $<

%.js: %.stache
	@minstache < $< > $@

%.js: %.data.json
	@echo "module.exports = " > $@ 
	@cat "$<"  >> $@
	@echo ";" >> $@

clean:
	rm -fr build components $(CONVERT) $(TEMPLATES) $(DATAJS)

.PHONY: clean
