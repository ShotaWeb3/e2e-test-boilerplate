FROM node:20.10

RUN set -x && \
    apt-get update && \
    apt-get install -y software-properties-common \
    curl unzip libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 \
    locales fonts-ipafont fonts-ipaexfont && \
    echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen  && locale-gen

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

RUN yarn add -g puppeteer aws-cdk@2.115.0 && \
    npx puppeteer browser install chrome

WORKDIR /app

CMD ["tail", "-f", "/dev/null"]
