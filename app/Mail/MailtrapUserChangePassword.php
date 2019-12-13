<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class MailtrapUserChangePassword extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     * @param $link,
     * @param $name
     *
     * @return void
     */
    public function __construct(string $link, string $name)
    {
        $this->link = $link;
        $this->name = $name;
        $this->message = (new MailMessage())
            ->greeting('Hello, ', $name)
            ->line('You have sent a password reset request.')
            ->action('Change Password', $link)
            ->line('The link is valid for 30 minutes.')
            ->line('Please ignore this letter if you did not send.');
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
