<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class MailtrapCheckoutSuccessfull extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *  @param $name string
     * @return void
     */
    public function __construct($name)
    {
        $this->name = $name;
        $this->message = (new MailMessage())
            ->greeting('Hello, ', $name)
            ->line('Thank you!')
            ->line('Thanks for buying from us. You make us smile!');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return  $this->markdown('vendor.notifications.email', $this->message->data());
    }
}
