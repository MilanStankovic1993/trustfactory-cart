<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class DailySalesReportMail extends Mailable
{
    public function __construct(public array $rows) {}

    public function build()
    {
        return $this->subject('Daily Sales Report')
            ->view('emails.daily-sales-report', [
                'rows' => $this->rows,
            ]);
    }
}
