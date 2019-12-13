<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class MailtrapUserRegistration extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     * @param $addressFrom
     * @param $name
     *
     * @return void
     */
    public function __construct(string $name)
    {
        $this->name = $name;
        $this->message = (new MailMessage())
            ->greeting('Hello, ', $name)
            ->line('Congratulation Thank you for joining us.');
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
