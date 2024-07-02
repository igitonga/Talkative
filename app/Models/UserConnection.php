<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserConnection extends Model
{
    use HasFactory;

    protected $fillable = ['party_A','party_B'];

    public function sentRequest(){
        return $this->belongsTo(User::class, 'party_A');
    }
}
