build:
	rm -rf .next/** && yarn build

deploy-development: 
	tar cvf .next.tgz .next
	scp -i ~/.ssh/tokenplay_code_dev .next.tgz scripts/deploy.sh root@157.230.251.198:~/
	ssh -i ~/.ssh/tokenplay_code_dev root@157.230.251.198 'bash ~/deploy.sh'
	rm .next.tgz

deploy-production:
	tar cvf .next.tgz .next
	scp .next.tgz scripts/deploy.sh root@178.128.84.154:~/
	ssh root@178.128.84.154 'bash ~/deploy.sh'
	rm .next.tgz