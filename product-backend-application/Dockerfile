FROM maven:3.8.7-openjdk-18-slim

WORKDIR /app

COPY . .

RUN mvn dependency:resolve

RUN mvn clean install

EXPOSE 8081

CMD ["java", "-jar", "target/product-backend-application-0.0.1-SNAPSHOT.jar"]