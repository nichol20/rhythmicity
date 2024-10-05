create-net:
	docker network create nginx_proxy;
	docker network create rabbitmq_net;
	docker network create api_gateway_net;

remove-net:
	docker network rm nginx_proxy;
	docker network rm rabbitmq_net;
	docker network rm api_gateway_net;

allocate-data:
	mkdir -p search-api/internal/db/data;
	mkdir -p main-api/internal/db/data;
	cp generate-db/data/app/* main-api/internal/db/data/;
	cp generate-db/data/elastic/* search-api/internal/db/data/;