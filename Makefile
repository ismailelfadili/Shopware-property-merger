
.PHONY: help
.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ---------------------------------------------------------------------------------------------

hello:
	@echo "hello FULLHAUS"

setup:
	./helpers/sync-custom-files.sh
	./helpers/sync-all-files.sh
	./helpers/sync-media-files.sh
	symfony server:ca:install
	composer install
	bin/console cache:clear
	@make up

up:
	symfony server:start -d
	@make urls
stop:
	symfony server:stop

urls: ## Print Project URIs
	@echo "---------------------------------------------------"
	@echo "You can access your project at the following URLs:"
	@echo "---------------------------------------------------"
	@echo ""
	@echo "Backend:         https://127.0.0.1:8000/admin#/login"
	@echo "  User:          admin"
	@echo "  Pass:          shopware"
	@echo "Frontend:        https://127.0.0.1:8000"
	@echo ""
