<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgressTable extends Migration
{
    public function up()
    {
        Schema::create('progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goal_id')->constrained()->onDelete('cascade');
            $table->integer('progress_duration');
            $table->timestamps();
            
        });
    }

    public function down()
    {
        Schema::dropIfExists('progress');
    }
}
