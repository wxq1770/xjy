dev:
	NODE_ENV=development node ./conf
	yarn start

production:
	NODE_ENV=production node ./conf
	yarn run build && yarn run make_prod

local:
	NODE_ENV=development node ./conf
	yarn run build && yarn run make_prod

all: dev
