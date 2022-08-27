keytool -genkey -alias tomcat -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 3650
Enter keystore password:  
Re-enter new password:mypa
What is your first and last name?
[Unknown]:  
What is the name of your organizational unit?
[Unknown]:  
What is the name of your organization?
[Unknown]:  
What is the name of your City or Locality?
[Unknown]:  
What is the name of your State or Province?
[Unknown]:  
What is the two-letter country code for this unit?
[Unknown]:  
Is CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
[no]:  
What is your first and last name?
[Unknown]:  
What is the name of your organizational unit?
[Unknown]:  
What is the name of your organization?
[Unknown]:  
What is the name of your City or Locality?
[Unknown]:  
What is the name of your State or Province?
[Unknown]:  
What is the two-letter country code for this unit?
[Unknown]:  
Is CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
[no]:  
What is your first and last name?
[Unknown]:  
What is the name of your organizational unit?
[Unknown]:  
What is the name of your organization?
[Unknown]:  
What is the name of your City or Locality?
[Unknown]:  
What is the name of your State or Province?
[Unknown]:  
What is the two-letter country code for this unit?
[Unknown]:  
Is CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
[no]: yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 3,650 days
for: CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown

```
keytool -list -v -keystore keystore.p12
        ⇨ password
```
