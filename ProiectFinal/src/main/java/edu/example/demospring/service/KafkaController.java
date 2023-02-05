package edu.example.demospring.service;

import edu.example.demospring.model.ProductDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class KafkaController {

    private static final String TOPIC_NAME = "spring-topic";
    private static final Logger log = Logger.getLogger(KafkaController.class.getCanonicalName());

    private KafkaTemplate<String, ProductDTO> kafkaTemplate;

    public KafkaController(KafkaTemplate<String, ProductDTO> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @RequestMapping(value = "/send_product", method = RequestMethod.POST)
    public ResponseEntity<Object> sendProduct(@RequestBody ProductDTO productDTO) {
        log.info("sending product to kafka");
        kafkaTemplate.send(TOPIC_NAME, productDTO);
        return new ResponseEntity<>("Message sent", HttpStatus.OK);
    }

    @KafkaListener(
            topics = TOPIC_NAME,
            groupId = "my-test",
            containerFactory = "kafkaListenerContainerFactory")
    public void greetingListener(ProductDTO productDTO) {
        log.info("Received:" + productDTO.getName());
    }
}
