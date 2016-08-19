Generate ssh key:

```
ssh-keygen -f id_rsa_recog_web
```

Copy *~/.ssh/id_rsa_recog_web.pub* inside *recog_gpu* server file */home/recog/.ssh/authorized_keys*

Create *~/.ssh/config* with this content:

```
Host recog_gpu
  Hostname 151.80.227.150
  User recog
  IdentityFile ~/.ssh/id_rsa_recog_web
```

rsync config, every 5 minutes:

```
*/5 * * * * /home/recog/recognition/server/rsync_gpu_to_web/rsync_mogrify.sh >> /home/recog/log/rsync_mogrify.log 2>&1
```
