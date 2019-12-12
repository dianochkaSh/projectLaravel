<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MailtrapUserNotification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     * @param $subject,
     * @param $content
     * @param $addressFrom
     * @param $name
     *
     * @return void
     */
    public function __construct(string $subject, string $content, string $addressFrom, string $name)
    {
        $this->subject = $subject;
        $this->addressFrom = $addressFrom;
        $this->content = $content;
        $this->name = $name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.notification', [
            'content' => $this->content,
            'subject' => $this->subject,
            'name' => $this->name,
        ])
            ->from($this->addressFrom)
            ->subject($this->subject);
    }
}
