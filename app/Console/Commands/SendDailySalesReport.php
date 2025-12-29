<?php

namespace App\Console\Commands;

use App\Mail\DailySalesReportMail;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendDailySalesReport extends Command
{
    protected $signature = 'report:daily-sales';
    protected $description = 'Send daily sales report to admin email';

    public function handle(): int
    {
        $start = now()->startOfDay();
        $end = now()->endOfDay();

        $rows = OrderItem::query()
            ->whereBetween('created_at', [$start, $end])
            ->with('product:id,name')
            ->get()
            ->groupBy('product_id')
            ->map(fn ($items) => [
                'product' => $items->first()->product->name,
                'quantity' => $items->sum('quantity'),
                'revenue' => $items->sum(fn ($i) => $i->quantity * $i->price_cents),
            ])
            ->values()
            ->all();

        Mail::to(env('ADMIN_EMAIL'))
            ->send(new DailySalesReportMail($rows));

        return self::SUCCESS;
    }
}
