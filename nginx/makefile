create-cert:
	mkdir -p ssl;
	openssl req -x509 -nodes -days 365 -subj "/C=BR/ST=SP/O=Rhythmicity, Inc./CN=rhythmicity" -addext "subjectAltName=DNS:localhost" -newkey rsa:2048 -keyout ./ssl/rhythmicity.key -out ./ssl/rhythmicity.crt;