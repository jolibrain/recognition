Generate ssh key:

```
ssk-keygen -f id_rsa_recog_web
```

Copy *~/.ssh/id_rsa_recog_web.pub* inside *recog_web* server file
*/hone/recog/.ssh/authorized_keys*

Create *~/.ssh/config* with this content:

```
Host recog_web
  Hostname 163.172.51.247
  User recog
  IdentityFile ~/.ssh/id_rsa_recog_web
```

rsync config, every 5 minutes:

```
*/5 * * * * rsync --protect-args -avz -e ssh /data/tate/imgs/reuters/RPA\ Feed\ for\ Tate/*.JPG recog_web:"/data/tate/imgs/reuters/RPA Feed for Tate/"
```
