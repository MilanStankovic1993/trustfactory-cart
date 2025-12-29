<h3>Daily Sales Report</h3>

@if (empty($rows))
    <p>No sales today.</p>
@else
    <table border="1" cellpadding="6" cellspacing="0">
        <thead>
            <tr>
                <th align="left">Product</th>
                <th align="right">Qty sold</th>
                <th align="right">Revenue</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($rows as $row)
                <tr>
                    <td>{{ $row['product'] }}</td>
                    <td align="right">{{ $row['quantity'] }}</td>
                    <td align="right">€{{ number_format($row['revenue'] / 100, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endif
