# From GPU server to Web server

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

# From Web server to geo-replicated server

Generate ssh key:

```
ssh-keygen -f id_rsa_recog_web
```

Place your generated *id_rsa_recog_web* and *id_rsa_recog_web.pub* key files inside *~/.ssh*

Create or edit your *~/.ssh/config* file with this content

```
Host recog_web
  Hostname 163.172.51.247
  User recog
  IdentityFile ~/.ssh/id_rsa_recog_web
```

Create image folders (change *YOUR_RECOG_GIT_CLONE* to absolute path to your git clone of recognition code)

```
cd YOUR_RECOG_GIT_CLONE
mkdir ui/website/dist/img/tate
mkdir ui/website/dist/img/reuters
rsync --protect-args -arvz -e ssh recog_web:"/data/tate/imgs/tate_final/" YOUR_RECOG_GIT_CLONE/ui/website/dist/img/tate/
```

Edit your crontab with the command: *crontab -e* (change *YOUR_RECOG_GIT_CLONE* to absolute path to your git clone of recognition code)

```
*/5 * * * * rsync --protect-args -arvz -e ssh recog_web:"/data/tate/imgs/reuters/Images\ of\ the\ Day\ Tate/" YOUR_RECOG_GIT_CLONE/ui/website/dist/img/reuters/
20 * * * * rsync --protect-args -arvz -e ssh recog_web:recognition/ui/website/dist/match.json YOUR_RECOG_GIT_CLONE/ui/website/dist/
20 * * * * rsync --protect-args -arvz -e ssh recog_web:recognition/ui/website/dist/splash.json YOUR_RECOG_GIT_CLONE/ui/website/dist/
```
