# Install monit

```
sudo apt-get install monit
```

# Edit monit config file

/etc/monit/monitrc

Change "password" for mailserver.

```
set daemon 120
set logfile syslog facility log_daemon

set mailserver smtp.gmail.com port 587
    username "monit.recognition@gmail.com"
    password "password"
    using tlsv1
    with timeout 30 seconds
set alert recognition@alexgirard.com with reminder on 15 cycles
set alert beniz@droidnik.fr with reminder on 15 cycles

check process nginx with pidfile /var/run/nginx.pid
  group www
  group nginx
  start program = "/etc/init.d/nginx start"
  stop program = "/etc/init.d/nginx stop"
  if failed port 80 protocol http request "/" then restart
  if failed port 80 protocol http request "/match.json" then restart
  if failed port 80 protocol http request "/splash.json" then restart
  if 5 restarts with 5 cycles then timeout
  depend nginx_bin
  depend nginx_rc

check file nginx_bin with path /usr/sbin/nginx
  group nginx
  include /etc/monit/templates/rootbin

check file nginx_rc with path /etc/init.d/nginx
  group nginx
  include /etc/monit/templates/rootbin

check host recog_gpu with address 151.80.227.150
  if failed icmp type echo
      count 5 with timeout 5 seconds
      2 times within 3 cycles
  then alert

check filesystem rootfs with path /dev/md2
  if space usage > 85% for 3 cycles then alert

check system recog_web
  if memory > 85% 2 times within 3 cycles then alert
  if cpu(user) > 95% for 5 cycles then alert
  if cpu(system) > 85% for 5 cycles then alert
```

# Restart monit

```
sudo /etc/init.d/monit reload
```
