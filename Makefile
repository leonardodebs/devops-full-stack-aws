.PHONY: build run test lint tf-init tf-plan tf-apply tf-destroy setup

build:
	docker build -t devops-app -f docker/Dockerfile .

run:
	cd docker && docker compose up -d

test:
	export PYTHONPATH=$PYTHONPATH:$(pwd) && pytest --cov=app app/tests/

lint:
	ruff check app/

tf-init:
	cd terraform/environments/dev && terraform init

tf-plan:
	cd terraform/environments/dev && terraform plan

tf-apply:
	cd terraform/environments/dev && terraform apply -auto-approve

tf-destroy:
	./scripts/destroy.sh

setup:
	chmod +x scripts/*.sh
	./scripts/setup.sh
