<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
use HasFactory;

    protected $fillable = [
        'goal_id', 'progress_duration'
    ];

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }

}

