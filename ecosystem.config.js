module.exports = {
  apps : [
    {
      name: "done24bot",
      script: "done24bot.mjs",
      autorestart: true,
      instances: 2,
      restart_delay: 3000,
      exec_mode: "cluster"
    },
    { 
      name: "redis-server",
      script: "redis-server"
    }
  ]
}