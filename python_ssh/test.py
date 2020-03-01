import spur

shell = spur.SshShell(hostname="10.25.24.252", username="pi", password="pass10word")
result = shell.run(["echo", "-n", "hello"])
result = shell.run(["echo", "-n", "hello world"])
print(result.output) # prints hello