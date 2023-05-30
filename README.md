
# Shopay SPA

This is the sample web application to demonstrate how to protect Single Page Applications (SPAs) using Asgardeo and Oauth2-proxy.


# Deploy on Kubernetes

## Prerequisites

1. A running [Kubernetes cluster](https://kubernetes.io/docs/setup/). You can use [Minikube](https://minikube.sigs.k8s.io/docs/start/) or [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation/) or similar software to run it on the local machine.
2. [Helm](https://helm.sh/docs/intro/install/) and [Kubernetes client](https://kubernetes.io/docs/tasks/tools/#kubectl) should be installed.
3. [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) should be installed. If you are using Minikube, you can install ingress by running ```minikube addons enable ingress``` command. If you are using Rancher Desktop, you can install ingress by following steps 1,2, and 3 in the [guide](https://docs.rancherdesktop.io/how-to-guides/setup-NGINX-Ingress-Controller/).
4. Register for an OpenID Connect single-page app following this [guide](https://wso2.com/asgardeo/docs/guides/applications/register-single-page-app/#register-the-app). You need to add https://spa.proxy.com/oauth2/callback as an authorized redirect URL. 

## Steps to deploy the sample application

Clone the repository onto your local machine using the following command.

```bash
git clone https://github.com/Ashok12011234/shopay-spa.git
```

### Minikube

For MAC users, run the following command in a new terminal to enable minikube tunneling.


```bash
sudo minikube tunnel
```

Run the following command to get the minikube IP.

```bash
minikube ip
```

Add the following records to the host file on your local machine. Replace the ```<minikube_ip>``` with the IP retrieved in the above step. Mac users should use ```127.0.0.1``` as the ```<minikube_ip>``` as we have enabled tunneling for Mac users.

```bash
<minikube_ip> sample.app.local
```

### Rancher Desktop

Find the external_ip  of ‘ingress-nginx-controller’ using this command:

```bash
kubectl get service ingress-nginx-controller --namespace=ingress-nginx
```

Add the following records to the host file on your local machine. Replace the ```<external_ip>``` with the IP retrieved in the above step

```bash
<external_ip>  sample.app.local
```

## Running the sample


Navigate to the ```helm-charts/main-chart``` location from the project directory and run the following command to install the sample app.

```bash
helm dependency update
```

```bash
helm upgrade --install \
--set oauth2-proxy.config.clientID=<client_id> \
--set oauth2-proxy.config.clientSecret=<client_secret> \
--set oauth2-proxy.extraArgs.oidc-issuer-url=<issuer_url> \
shopay . -n shopay --create-namespace
```

Note that you can get ```client_id``` and ```client_secret``` in the Protocol tab and ```issuer_url``` in the Info tab of your application in the Asgardeo console.

If you are using the provided self-signed certificate then import the CA certificate in ```helm-charts/oauth2-proxy/self-signed-cert/selfsignCA.crt ``` location to the browser.

Run the following command and check whether the pods are in a running state.

```bash
kubectl get pods -n shopay
```

You can now access the sample application using this [URL](https://sample-app.local/home).