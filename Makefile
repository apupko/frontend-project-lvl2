install: install-deps

run:
	bin/gendiff.js -h

install-deps:
	npm ci

lint:
	npx eslint .

