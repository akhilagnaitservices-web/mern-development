const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const GothrasFilter = ({ activeLetter, setActiveLetter, search, setSearch }) => {
    return (
        <div className="gothras-filters">
            <div className="container">
                <div className="gothras-filters-inner">

                    {/* Alphabet tabs */}
                    <div className="gothras-alpha-tabs">
                        <button
                            className={`alpha-tab all ${activeLetter === '' ? 'active' : ''}`}
                            onClick={() => setActiveLetter('')}
                        >
                            All
                        </button>
                        {ALPHABET.map(letter => (
                            <button
                                key={letter}
                                className={`alpha-tab ${activeLetter === letter ? 'active' : ''}`}
                                onClick={() => setActiveLetter(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="gothras-search">
                        <input
                            type="text"
                            placeholder="Search Gothra..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="gothras-search-btn">🔍</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GothrasFilter