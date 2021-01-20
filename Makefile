install: install-deps

run:
	bin/gendiff.js -h

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

view-tree:
	tree -I node*

.PHONY: test

