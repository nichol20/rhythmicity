package rabbitmq

import (
	amqp "github.com/rabbitmq/amqp091-go"
)

type RabbitMQClient struct {
	Conn    *amqp.Connection
	Channel *amqp.Channel
}

var Client *RabbitMQClient
var PlayCountQueue *amqp.Queue

func StartRabbitMQClient(url string) error {
	conn, err := amqp.Dial(url)
	if err != nil {
		return err
	}

	ch, err := conn.Channel()
	if err != nil {
		conn.Close()
		return err
	}

	Client = &RabbitMQClient{
		Conn:    conn,
		Channel: ch,
	}

	return nil
}

func (r *RabbitMQClient) Close() {
	if r.Channel != nil {
		r.Channel.Close()
	}
	if r.Conn != nil {
		r.Conn.Close()
	}
}

func (r *RabbitMQClient) DeclarePlayCountQueue() error {
	q, err := r.Channel.QueueDeclare(
		"play_count", // name
		false,        // durable
		false,        // delete when unused
		false,        // exclusive
		false,        // no-wait
		nil,          // arguments
	)
	if err != nil {
		return err
	}

	PlayCountQueue = &q
	return nil
}

func (r *RabbitMQClient) ConsumeFromPlayCountQueue() (<-chan amqp.Delivery, error) {
	return r.Channel.Consume(
		PlayCountQueue.Name, // queue
		"",                  // consumer
		true,                // auto-ack
		false,               // exclusive
		false,               // no-local
		false,               // no-wait
		nil,                 // args
	)
}
