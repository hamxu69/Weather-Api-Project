function App() {
    function DisplayFunc() {
        const InputField = document.querySelector('.Input');
        let Name = '':
        Name = InputField.value;
    }
  }, []);

  useEffect(() => {
    void loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const forecastDays = useMemo(
    () => (weather ? getForecastDays(weather.daily.time) : []),
    [weather],
  )

  return (
    <>
      <Header
        units={units}
        onUnitsChange={setUnits}
        onTemperatureChange={updateTemperature}
        onWindChange={updateWind}
        onPrecipitationChange={updatePrecipitation}
      />

      <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How&apos;s the sky looking today?
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Search any city for live conditions and a 7-day forecast.
          </p>
          <div className="mt-8">
            <SearchBar onSearch={loadWeather} isLoading={isLoading} />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
          {isLoading ? <WeatherSkeleton /> : null}

          {!isLoading && hasError ? (
            <WeatherError onRetry={() => void loadWeather(DEFAULT_CITY)} />
          ) : null}

          {!isLoading && weather ? (
            <>
              <div className="flex min-w-0 flex-col gap-6 lg:gap-8">
                <Hero geo={weather.geo} current={weather.current} formatTemp={formatTemp} />
                <StatsCards
                  current={weather.current}
                  formatTemp={formatTemp}
                  formatWind={formatWind}
                  formatPrecip={formatPrecip}
                  windLabel={windLabel}
                  precipLabel={precipLabel}
                />
                <DailyForecast daily={weather.daily} formatTemp={formatTemp} />
              </div>

              <HourlyForecast
                hourly={weather.hourly}
                forecastDays={forecastDays}
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
                formatTemp={formatTemp}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;