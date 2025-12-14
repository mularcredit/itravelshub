'use client';

export default function SkeletonGrid() {
    return (
        <div className="row g-4 mt-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="placeholder-glow">
                            <div className="placeholder bg-secondary" style={{ height: '200px', width: '100%' }}></div>
                        </div>
                        <div className="card-body">
                            <div className="placeholder-glow">
                                <span className="placeholder col-8 mb-2"></span>
                                <span className="placeholder col-6 mb-3"></span>
                                <span className="placeholder col-4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
