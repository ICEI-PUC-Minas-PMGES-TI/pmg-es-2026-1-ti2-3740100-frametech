FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY . .
RUN chmod +x ./src/back/mvnw
RUN cd src/back && ./mvnw clean package -DskipTests
CMD ["java", "-jar", "src/back/target/BackEnd-0.0.1-SNAPSHOT.jar"]