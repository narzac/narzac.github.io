---
layout: post
language: en
categories: en blog programming
unique_id: 3_en
date: 2014-08-10 22:55
title:  "Play with Ansible in your local machine with Vagrant"
tags: ansible local vagrant macosx
---

[Ansible](http://www.ansible.com/home) is an IT automation tool. I have been using ansible for almost a year now. Its [documentation](http://docs.ansible.com/) is so good,
I have never encountered a problem that I haven't been able to solve. Lately I wanted to go deep and the best way to learn something is by doing it.
I have also wanted this system to resemble the actual digital ocean VPS as much as possible.
So I come up with the following to experiment with it. I will tell the procedure in MacOSX since it is more troublesome, you can easily do this in Linux if you like.

Install [VirtualBox](http://virtualbox.org/),[Vagrant](http://vagrantup.com)
and [ansible](http://www.ansible.com/home).

First install homebrew if haven't installed it already

{% highlight bash %}
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

Then install ansible

{% highlight bash %}
$ brew install ansible
{% endhighlight %}

First install homebrew cask if haven't installed it already

{% highlight bash %}
$ brew install caskroom/cask/brew-cask
$ brew tap caskroom/versions
{% endhighlight %}

Then install Virtualbox and Vagrant

{% highlight bash %}
$ brew cask install virtualbox >2 /dev/null
$ brew cask install vagrant >2 /dev/null
{% endhighlight %}

Alright lets start to configure. The directory structure is like the below.

{% highlight text %}
.
├── Vagrantfile
└── ansible
    ├── hosts
    └── playbook.yml
{% endhighlight %}

The "Vagrantfile" is a very simple one. This will just install ubuntu trust64, and configure a private ip address to our machine.

{% highlight ruby %}
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network :private_network, ip: "10.0.0.200"
end
{% endhighlight %}

The "hosts" file is the following

{% highlight text %}
[vagrant]
10.0.0.200
{% endhighlight %}


Add this into your ~/.ssh/config to easily ssh into machine

{% highlight text %}
Host 10.0.0.200
  StrictHostKeyChecking no
  UserKnownHostsFile /dev/null
  IdentitiesOnly yes
  IdentityFile /Users/narzac/.vagrant.d/insecure_private_key
  PasswordAuthentication no
{% endhighlight %}

At this step you can test your ssh connection by typing.

{% highlight bash %}
$ ssh vagrant@10.0.0.200
{% endhighlight %}

If that succesfull this means you can run ansible ad-hoc commands such as

{% highlight bash %}
$ ansible vagrant -u vagrant -i ansible/hosts -m ping
{% endhighlight %}

And this should result as

{% highlight bash %}
10.0.0.200 | success >> {
    "changed": false,
    "ping": "pong"
}
{% endhighlight %}

Now to experiment with the playbooks, we need one, create this simple "playbook.yml".

{% highlight yaml %}
---
- hosts: vagrant
  remote_user: vagrant
  tasks:
  - name: install tree
    apt: pkg=tree state=latest
    sudo: yes
{% endhighlight %}

Run this playbook against the vagrant machine

{% highlight bash %}
$ ansible-playbook -i ansible/hosts ansible/playbook.yml
{% endhighlight %}

And this should result as
{% highlight bash %}
PLAY [vagrant] ******************************************************

GATHERING FACTS *****************************************************
ok: [10.0.0.200]

TASK: [install tree] ************************************************
ok: [10.0.0.200]

PLAY RECAP **********************************************************
10.0.0.200      : ok=2    changed=0    unreachable=0    failed=0
{% endhighlight %}

This way you can experiment with ansible from your local machine. There is one more detail however, if you want to provision a machine by connecting
through a password protected user then you need to install sshpass program. In real life this is usually the case. So let me share it with you.
In Linux this is easy to install with your package manager. In MacOSX if you try to install it via brew it will tell you that

{% highlight text %}
We won't add sshpass because it makes it too easy for novice SSH users to
ruin SSH's security.
{% endhighlight %}

There are suggested formulas to install with brew, yet none seems to work, they are not up to date i presume. Anyway we will install it manually.

{% highlight bash %}
$ curl -O http://netcologne.dl.sourceforge.net/project/sshpass/sshpass/1.05/sshpass-1.05.tar.gz
$ tar xzvf sshpass-1.05.tar.gz
$ cd sshpass-1.05/
$ ./configure
$ make
$ sudo make install
{% endhighlight %}

Now assuming you are going to connect your actual VPS and obviously you need to be authenticated. In this case you need an additonal switch.

{% highlight bash %}
$ ansible vagrant -u vagrant -i ansible/hosts -m ping --ask-pass
$ ansible-playbook -i ansible/hosts ansible/playbook.yml --ask-pass
{% endhighlight %}

In conclusion, you can use this to experiment with ansible, prepare your provisioning, and when you are ready you can actually provision your VPS.
Also you can provision your development machine this way instead of vagrant ansible provisioner. Provisioning with vagrant ansible provisioner looks something like this.

{% highlight ruby %}
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network :private_network, ip: "10.0.0.200"

    config.vm.provision "ansible" do |ansible|
        ansible.host_key_checking = false
        ansible.inventory_path = "ansible/hosts"
        ansible.playbook = "ansible/playbook.yml"
        ansible.limit = "all"
    end
end
{% endhighlight %}

This way, when you said `vagrant up` for the first time it will provision automatically by default. And when you said `vagrant provision` it will provision like we do with

{% highlight bash %}
$ ansible-playbook -i ansible/hosts ansible/playbook.yml
{% endhighlight %}

I guess using vagrant ansible provisioner is easy considering you don't have to put anything into your ~/.ssh/config.

What now? Go read the [ansible docs](http://docs.ansible.com/). As I once read in the auctex documentation "Unfortunately, people always know better".
Hope this helps <span class="fontelico-emo-wink2"></span>